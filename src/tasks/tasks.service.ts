import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//import { v1 as uuidv1 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ){}

    getTasks(filterDto: GetTaskFilterDto){
        return this.taskRepository.getTasks(filterDto);
    }
    // private tasks: Task[] = [];

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
    //     const { status, search } = filterDto;

    //     let tasks = this.getAllTasks();

    //     if(status){
    //         tasks = tasks.filter(task=> task.status === status);
    //     }

    //     if(search){
    //         tasks = tasks.filter(task=>task.title.includes(search) || task.description.includes(search));
    //     }
    //     return tasks;
    // }

     async getTaskbyid(id: number): Promise<Task>{
            const found = await this.taskRepository.findOne(id);

            if(!found){
                throw new NotFoundException(`Task with ID "${id}" not found`);
            }
            return found;
        }

    // getTaskById(id: string): Task {
    //     const found =  this.tasks.find(task => task.id === id);

    //     if(!found){
    //         throw new NotFoundException(`Task with ID "${id}" not found`);
    //     }
    //     return found;
    // }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        return this.taskRepository.createTask(createTaskDto);
    }


    // createTask(CreateTaskDto: CreateTaskDto): Task{
    //     const {title, description } = CreateTaskDto;
    //     const task: Task = {
    //         id: uuidv1(),
    //         title,  
    //         description,
    //         status:TaskStatus.OPEN,
    //     }
    //     this.tasks.push(task);
    //     return task;
    // }

async deleteTask(id: number): Promise<void>{
    const result = await this.taskRepository.delete(id);

    if(result.affected === 0){
        throw new NotFoundException(`Task with ID "${id}" not found`);
    }
}

    // deleteTask(id:string): void{
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task=>task.id !== found.id);
    // }


    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task>{
        const task = await this.getTaskbyid(id);
        task.status = status;
        await task.save();
        return task;
    }

    // updateTaskStatus(id: string, status: TaskStatus){
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}
