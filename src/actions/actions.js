export const setRolesAction = roles => {
	return {type: "SET_ROLES",roles: roles}
}

export const setRoleAction = role => {
	return {type: "SET_ROLE",selectedRole: role}
}

export const updateRoleAction = role => {
	return {type: "UPDATE_ROLE",selectedRole: role}
}

export const addRoleAction = role => {
	return {type: "ADD_ROLE",role: role}
}

export const getRoles = () => {
	return dispatch => {
		return fetch("http://localhost:3001/api/roles")
			.then(resp => resp.json())
			.then(roles => dispatch(setRolesAction(roles)))
	}
}

export const selectRole = (role) => {
	return dispatch => {
		return dispatch(setRoleAction(role))
	}
}

export const resetSelectedRole = () => {
	return dispatch => {
		return dispatch(setRoleAction())
	}
}

export const updateRole = (selectedRole,newValue) => {
	return dispatch => {
		const updatedRole = {
			...selectedRole,
			status: newValue
		}
		fetch(`http://localhost:3001/api/roles/${selectedRole.id}`,{
			method: 'PATCH',
			headers: {
				"Content-Type": 'application/json'
			},
			body: JSON.stringify(updatedRole)
		})
			.then(resp => resp.json())
			.then(role => dispatch(updateRoleAction(role)))
	}
}

export const addRole = (role) => {
	return dispatch => {
		fetch('http://localhost:3001/api/roles',{
			method: 'POST',
			headers: {
				"Content-Type": 'application/json'
			},
			body: JSON.stringify(role)
		})
			.then(resp => resp.json())
			.then(role => {
				if(role.message) {
					const messages = Object.entries(role.message)
					alert(messages.map(m =>
						`${m[0].toUpperCase()}: ${m[1]}`
					).join('  |  '))
				} else {
					dispatch(addRoleAction(role))
				}
			})
	}
}