export class Todo {
    public title: string;
    public description: string;
    public done: boolean;
    public deadline: Date;
  
    constructor(title: string, desc: string, deadline: Date, done: boolean) {
      this.title = title;
      this.description = desc;
      this.deadline = deadline;
      this.done = done;
    }
  }