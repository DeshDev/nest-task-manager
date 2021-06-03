import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private TasksService: TasksService){}

    // @Get()
    // getAllTasks(): Task[] {
    //     return this.TasksService.getAllTasks();
    // }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {
        if(Object.keys(filterDto).length){
            return this.TasksService.getTasksWithFilters(filterDto);
        }else{
            return this.TasksService.getAllTasks();
        }
        
    }


    @Get('/:id')
    getTaskByid(@Param('id') id: string): Task{
        return this.TasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() CreateTaskDto: CreateTaskDto): Task{
        return this.TasksService.createTask(CreateTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void{
        this.TasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task{
        return this.TasksService.updateTaskStatus(id, status);
    }

}
