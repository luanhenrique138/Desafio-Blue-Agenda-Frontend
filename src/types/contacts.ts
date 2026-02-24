export type Contact = {
    id: string
    name: string
    email: string
    phone: string
    createdAt: string,
    updatedAt : string | null
}

export type CreateContactRequest = {
  name: string
  email: string
  phone: string
}

export type UpdateContactRequest = {
  name: string
  email: string
  phone: string
}

export type ContactResponse = {
    
}