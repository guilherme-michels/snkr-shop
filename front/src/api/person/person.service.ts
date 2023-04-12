import { api } from "../index";
import { Person } from "../../interfaces/PersonInterface";

interface PersonResponse {
  person: Person;
  message: string;
}

interface PeopleResponse {
  personList: Person[];
  message: string;
}

export interface loginPeople {
  email: string;
  token?: string;
  password: string;
  name?: string;
  id?: string;
}

export function addPerson(person: Omit<Person, "id">) {
  return api
    .post<PersonResponse>("/person/store", person)
    .then((res) => res.data);
}

export function editPerson(person: Person) {
  return api
    .put(`/persons/${person.id}/update`, person)
    .then((res) => res.data);
}

export function editPassword(person: Person) {
  return api
    .put(`/persons/${person.id}/update`, person)
    .then((res) => res.data);
}

export function getPerson(personId: string) {
  return api
    .get<PersonResponse>(`/persons/${personId}/show`)
    .then((res) => res.data);
}

export function getPersonMe() {
  return api.get<PersonResponse>(`/persons/me`).then((res) => res.data);
}

export function getPeople() {
  return api.get<PeopleResponse>(`/persons`).then((res) => res.data);
}

export function deletePerson(person: Person) {
  return api
    .delete<PersonResponse>(`/persons/${person.id}/delete`)
    .then((res) => res.data);
}

export function validateLogin(person: loginPeople) {
  return api.post<loginPeople>("/login", person).then((res) => res.data);
}
