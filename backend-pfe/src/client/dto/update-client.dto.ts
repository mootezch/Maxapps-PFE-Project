// src/client/dto/update-client.dto.ts

export class UpdateClientDto {
  idUser: number
  idClient: number
  nom: string
  prenom: string
  telephone?: string
  adresse?: string
  userStatus?: string
}
