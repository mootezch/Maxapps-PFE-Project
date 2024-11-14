import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ProjectService } from '../projet/projet.service'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update.project.dto'
import { TicketService } from '../ticket/ticket.service' // Assurez-vous d'importer le service TicketService
import { Ticket } from 'src/ticket/ticket.entity'

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly ticketService: TicketService
  ) {}

  @Post('add')
  create(@Body() createProjectDto: CreateProjectDto) {
    console.log('Creating a project:', createProjectDto)
    return this.projectService.create(createProjectDto)
  }

  @Get()
  findAll() {
    console.log('Fetching all projects')
    return this.projectService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    console.log('Fetching project with id:', id)
    return this.projectService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto) {
    console.log('Updating project with id:', id, updateProjectDto)
    return this.projectService.update(id, updateProjectDto)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    console.log('Deleting project with id:', id)
    return this.projectService.remove(id)
  }
}
