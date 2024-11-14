// src/users/users.service.ts
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { User } from './users.entity'
import { Client } from 'src/client/client.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { Notification } from 'src/notification/notification.entity'
import { sendPushNotification } from 'src/utils/expo.api'
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['token'] })
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email }, relations: { client: true, personals: true } })
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { idUser: id } })
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { nom, prenom, email, push_token, password, mobile, address } = createUserDto

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user entry
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      role: 'client' // Set the role to 'client'
    })

    // Save user to get the generated id
    const savedUser = await this.userRepository.save(user)

    // Create client entry
    const client = this.clientRepository.create({
      idUser: savedUser.idUser,
      nom: nom,
      prenom: prenom,
      telephone: mobile,
      adresse: address
    })

    // Save client
    await this.clientRepository.save(client)

    try {
      const userToken: Notification = new Notification()

      userToken.user = savedUser
      userToken.token = push_token

      await this.notificationRepository.save(userToken)
    } catch (err) {
      console.log('error token save')
    }
    return savedUser
  }

  async update(id: number, userData: any): Promise<User> {
    let { userStatus: status, idClient, nom, prenom, email, telephone, adresse } = userData

    status = status === 'true' ? true : false

    await this.userRepository.update(id, { email, status })
    await this.clientRepository.update(idClient, { nom, prenom, telephone, adresse })

    let updated_user: User = await this.userRepository.findOne({ where: { idUser: id }, relations: ['token'] })

    console.log({ updated_user })

    let userPushToken = updated_user.token

    let send_obj = {
      to: userPushToken.token,
      title: 'mise à jour du compte',
      body: 'votre compte est activé , vous pouvez connectez'
    }
    await sendPushNotification(send_obj)
    return updated_user
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id)
  }
}
