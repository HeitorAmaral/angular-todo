import { Component } from '@angular/core';
import { Todo } from 'src/models/todo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root', // <app-root>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode: string = 'list';
  public todos: Todo[] = []; //Public - Terá acesso a ela no HTML.
  public title: String = 'Lista de Tarefas';
  public form: FormGroup;

  /**
   * Método é chamado toda vez que o Component é iniciado.
   */
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    })
    this.load();
  }

  generateId(): Number {
    const id = this.todos.length + 1;
    return id;
  }

  clear() {
    this.form.reset();
  }

  add() {
    const title = this.form.controls['title'].value;
    this.todos.push(new Todo(this.generateId(), title, false));
    this.clear();
    this.save();
  }

  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list';
    this.save();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    this.save();
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }

  markAsUnDone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  load() {
    const data = localStorage.getItem('todos');
    if (data) {
      this.todos = JSON.parse(data);
    } else {
      this.todos = [];
    }
  }

  changeMode(mode: string) {
    this.mode = mode;
  }
}
