export interface Task {
  id: string;
  title: string;
  actor: string;
  description: string;
  category: string;
  estimate: string;
  order: number;
}

export const currentTasks = [
  {
      "id": "6d927df3-bfb2-4ede-8eee-a5cf9de28c02",
      "title": " Follow the Mulesoft Support Cases ",
      "actor": "Guillaume",
      "description": "",
      "category": "Mulesoft",
      "estimate": "",
      "order": 0
  },
  {
      "id": "32e86dff-5d3b-4b8f-89b1-270d8ad75d30",
      "title": " test the plugin",
      "actor": "Guillaume",
      "description": "",
      "category": "DevOps/Sonar Cube",
      "estimate": "",
      "order": 1
  },
  {
      "id": "316f3c74-88f7-4a22-9600-37e9f7066d35",
      "title": " Deploy to production + Add Graphics to Anypoint Monitoring",
      "actor": "",
      "description": "",
      "category": "Metrics",
      "estimate": "",
      "order": 2
  },
  {
      "id": "403e4f14-2d64-48ec-9e4c-ba94e3802c28",
      "title": " test the plugin - TODO => ",
      "actor": "Guillaume",
      "description": "",
      "category": "DevOps/Sonar Cube",
      "estimate": "",
      "order": 3
  },
  {
      "id": "439df24d-aff6-45a0-bac2-47887ef53dd8",
      "title": " VAPOL MyLVT application crash on prp => Follow up the status",
      "actor": "",
      "description": "",
      "category": "Projects/VAPOL",
      "estimate": "",
      "order": 4
  },
  {
      "id": "275c489c-a62e-4047-be1f-e51d6e4d715f",
      "title": " Pour les proxy, ajouter dans le CI/CD la possibilité de mettre 2 Workers",
      "actor": " Guillaume OGIER",
      "description": "Création d’un JIRA à Rabie",
      "category": "DevOps",
      "estimate": "",
      "order": 5
  }
];

export const currentTasksEmpty : Array<Task> = [] as Array<Task>;

export const currentTasks2 = [
  {
    id: '1',
    title: 'My first task',
    actor: 'Guillaume',
    description: 'A large phone with one of the best screens',
    category: 'CAT1',
    estimate: '15m',
    order: 3,
  },
  {
    id: '2',
    title: 'My second action',
    actor: 'Guillaume',
    description: '',
    category: 'CAT1',
    estimate: '1h',
    order: 2,
  },
  {
    id: '3',
    title: 'Another activity',
    actor: 'Someone',
    description: 'This is a new task to do',
    category: 'CAT2',
    estimate: '30m',
    order: 1,
  },
];

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
