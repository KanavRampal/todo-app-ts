console.log("script is running");
class Todo {
  task: string;
  done: boolean;
  status: boolean;
  constructor(task: string) {
    this.task = task;
    this.status = true;
    this.done = false;
  }
}
class Todos {
  todos: Todo[];
  nextIndex: number;
  constructor() {
    this.todos = [];
    this.nextIndex = 0;
  }
  add(task: string) {
    this.todos.push(new Todo(task));
    this.nextIndex++;
  }
  display() {
    var inputTask = <HTMLElement>document.getElementById("TodoList");
    inputTask.innerText = "";
    var id:number = 0;
    for (let todo of this.todos) {
      console.log(todo.task);
      if (todo.status == true) {
        var taskElemet = document.createElement("div");
        taskElemet.setAttribute("id","ListDiv"+id);
        taskElemet.style.alignContent = "centre";
        taskElemet.style.textAlign = "centre";
        var completeButton = document.createElement("button");
        completeButton.setAttribute("id","CompleteButton"+id);
        completeButton.setAttribute("onClick","completeButtonPressed("+id +")");
        var label = document.createElement("label");
        label.setAttribute("id","Label"+id);
        var deleteButton = document.createElement("button");
        deleteButton.setAttribute("onClick","deleteButtonPressed("+id+")");
        label.innerText = todo.task;
        label.style.color = "white";
        if (todo.done == true) {
          label.style.textDecoration = "line-through";
          completeButton.innerText = "Undone";

        }
        else {
          completeButton.innerText = "Done";
          var editButton = document.createElement("button");
          editButton.setAttribute("id","EditButton"+id);
          editButton.setAttribute("onClick","editButtonClicked("+id+")");
          editButton.innerText = "Edit";
        }
        deleteButton.innerText = "Delete";
        if(todo.done!=true)
        taskElemet.appendChild(editButton);
        taskElemet.appendChild(label);
        taskElemet.appendChild(completeButton);
        taskElemet.appendChild(deleteButton);
        <HTMLElement>document.getElementById("TodoList").appendChild(taskElemet);
      }
      id++;
    }
  }
}


var list = new Todos();
function addClicked() {
  var input = (<HTMLInputElement>document.getElementById("inputTask")).value;
  (<HTMLInputElement>document.getElementById("inputTask")).value = "";
  if (input != "") {
    list.add(input);
    list.display();
  }
  else {
    console.log("Please Enter Some value");
  }
}
function deleteButtonPressed(id:string){
  console.log("Delete Button Pressed");
  if(confirm("Are you sure you want to Delete ??")==true)
    {
    list.todos[parseInt(id)].status = false;
    list.display();
    }

}
function completeButtonPressed(id:string){
  console.log("completeButtonPressed number is :: "+id);
  if (list.todos[parseInt(id)].done==false) {
    list.todos[parseInt(id)].done=true;
  }
  else{
    list.todos[parseInt(id)].done = false;
  }
  list.display();
}
function editButtonClicked(id:string){
  console.log("editButtonPressed");
  var div=<HTMLElement>document.getElementById("ListDiv"+id);
  var divBackup = div;
  var editTextField = document.createElement("input");
  editTextField.setAttribute("placeholder",list.todos[parseInt(id)].task);
  editTextField.style.color="blue";
  editTextField.setAttribute("id","editTextField"+id);
  var saveButton = document.createElement("button");
  saveButton.innerText = "Save";
  saveButton.setAttribute("onClick","save("+id+")");
  var cancelButton =document.createElement("button");
  cancelButton.innerText="Cancel";
  cancelButton.setAttribute("onClick","cancel()");
  div.innerHTML="";
  div.appendChild(editTextField);
  div.appendChild(saveButton);
  div.appendChild(cancelButton);
}
function cancel(id:string){
  list.display();
}
function save(id:string){
  var text = (<HTMLInputElement>document.getElementById("editTextField"+id)).value;
  if(text!=""){
    list.todos[parseInt(id)].task = text;
    list.display();
}
}
