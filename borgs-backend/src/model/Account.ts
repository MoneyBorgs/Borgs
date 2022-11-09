export default class Account {
	account_id!: number
	user_id!: number
	name!: string
}

export class VirtualAccount extends Account {}
export class PhysicalAccount extends Account {}
