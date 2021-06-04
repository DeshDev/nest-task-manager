import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService){}
    // constructor(private TasksService: TasksService){}

    // // @Get()
    // // getAllTasks(): Task[] {
    // //     return this.TasksService.getAllTasks();
    // // }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Promise<Task[]>{
        return this.tasksService.getTasks(filterDto);
    }


    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id:number): Promise<Task> {
        return this.tasksService.getTaskbyid(id);
    }
    // @Get()
    // getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {
    //     if(Object.keys(filterDto).length){
    //         return this.TasksService.getTasksWithFilters(filterDto);
    //     }else{
    //         return this.TasksService.getAllTasks();
    //     }
        
    // }


    // @Get('/:id')
    // getTaskByid(@Param('id') id: string): Task{
    //     return this.TasksService.getTaskById(id);
    // }


    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() CreateTaskDto: CreateTaskDto): Promise<Task>{
        return this.tasksService.createTask(CreateTaskDto);
    }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createTask(@Body() CreateTaskDto: CreateTaskDto): Task{
    //     return this.TasksService.createTask(CreateTaskDto);
    // }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void>{
        return this.tasksService.deleteTask(id);

        
    }

    // @Delete('/:id')
    // deleteTask(@Param('id') id: string): void{
    //     this.TasksService.deleteTask(id);
    // }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
      ): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, status);
    }

    // @Patch('/:id/status')
    // updateTaskStatus(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task{
    //     return this.TasksService.updateTaskStatus(id, status);
    // }

}
