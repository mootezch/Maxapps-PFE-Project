import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Project } from '../projet/projet.entity'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update.project.dto'
import { Client } from 'src/client/client.entity'
import { Notification } from 'src/notification/notification.entity'
import { sendPushNotification } from 'src/utils/expo.api'
@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.projectRepository.create(createProjectDto)
    let saved_project = await this.projectRepository.save(project)

    let client: Client = await this.clientRepository.findOne({
      where: { idClient: saved_project.idClient },
      relations: ['user.token']
    })

    if (client) {
      if (client?.user?.token != null) {
        let userPushToken = client.user.token

        let send_obj = {
          to: userPushToken.token,
          title: 'Votre Project est créé',
          body: 'Votre Project est créé'
        }
        await sendPushNotification(send_obj)
      }
    }

    return saved_project
  }

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find({
      relations: ['client', 'client.user']
    })
  }

  async findOne(id: number): Promise<Project | undefined> {
    return await this.projectRepository.findOne({ where: { id } }) // Using 'id' directly
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project | undefined> {
    await this.projectRepository.update(id, updateProjectDto)
    return await this.projectRepository.findOne({ where: { id } }) // Using 'id' directly
  }

  async remove(id: number): Promise<void> {
    await this.projectRepository.delete(id)
  }
}
