import {JobField} from "./job_field";
import {User} from "./user";

export interface Job {
    id?: number,
    name?: string,
    description?: string,
    offer?: string,
    requirement?: string,
    salary?: number,
    createdAt?: Date,
    featured?: boolean,
    location?: string,
    jobField?: string,
    email?: string
}
