/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership. Camunda licenses this file to you under the Apache License,
 * Version 2.0; you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Client, logger, Variables } from "camunda-external-task-client-js";

// Configuration for the Client:
//  - 'baseUrl': URL to the Process Engine
//  - 'logger': utility to automatically log important events
const config = {
  baseUrl: "http://localhost:8080/engine-rest",
  use: logger,
};

// Create a Client instance with custom configuration
const client = new Client(config);


// Create a handler for the task
const handler = async ({ task, taskService }) => {
  // Get the required task variables
  const customerId = task.variables.get("value1");
  const customerName = task.variables.get("value2");
  const customerData = task.variables.get("value3");

  // Implement the logic for Save Customer Data task
  // For example, you can save the customer data to a database or perform any other necessary operations

  // Save the customer data to the database or perform other operations
  // ...

  // Complete the task
  try {
    await taskService.complete(task);
    console.log("Save Customer Data task completed successfully!");
  } catch (error) {
    console.error("Failed to complete Save Customer Data task:", error);
  }
};

// Subscribe to the topic 'saveCustomerData' and provide the created handler
client.subscribe("saveCustomerData", handler);
