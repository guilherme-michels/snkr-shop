import { api } from "../index";
import { Person } from "../../interfaces/PersonInterface";

interface PersonResponse {
  person: Person;
  message: string;
}

interface PeopleResponse {
  personList: Person[];
}

export interface loginPeople {
  email: string;
  token?: string;
  password: string;
  name?: string;
  id?: string;
  position?: string;
}

export interface registerAccount {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export function addPerson(person: Omit<Person, "id">) {
  return api
    .post<PersonResponse>("/person/store", person)
    .then((res) => res.data);
}

export function editPerson(person: Person) {
  return api.put(`/person/${person.id}/update`, person).then((res) => res.data);
}

export function getPerson(personId: string) {
  return api.get<Person>(`/person/${personId}/show`).then((res) => res.data);
}

export function getPeople() {
  return api.get<Person[]>(`/person/all`).then((res) => res.data);
}

export function deletePerson(personId: string) {
  return api.delete(`/person/${personId}/delete`).then((res) => res.data);
}

export function validateLogin(person: loginPeople) {
  return api.post<loginPeople>("/login", person).then((res) => res.data);
}

export function createAccount(person: registerAccount) {
  return api.post("/register", person).then((res) => res.data);
}

export function getPersonCart() {
  return api.get(`/person/cart`).then((res) => res.data);
}

export function deleteProductPersonCart(productId: string, size: number) {
  return api
    .delete(`/person/cart/${productId}/delete/${size}`)
    .then((res) => res.data);
}

export function addProductPersonCart(productId: string, size: number) {
  return api
    .post(`/person/cart/${productId}/store`, size)
    .then((res) => res.data);
}
