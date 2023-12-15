import {JobField} from "./job_field";
import {User} from "./user";

export interface Job {
    id?: number,
    name?: string,
    description?: string,
    offer?: string,
    requirement?: string,
    salary?: number,
    created_at?: Date,
    featured?: boolean,
    location?: string,
    field?: JobField,
    user?: User
}
