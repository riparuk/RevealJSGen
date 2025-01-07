import GPTClient from './GPTClient';
import ToolInterface from './interfaces/ToolInterface';
import Action from './Action';

class ActionManager {
  private actions: Array<ToolInterface>;
  private gptClient: GPTClient;
  private instance: Action;

  constructor(instance: Action) {
	this.actions = [];
	this.instance = instance;
	this.gptClient = new GPTClient();
  }

  async generateAction(messages: Array<any>) {

	try {
	  console.log("Generating action...");
	  const response = await this.gptClient.sendMessage(messages, this.instance.getTools());
	  const result = this.gptClient.handleResponse(response);

	  // if string means the response is a message, if array means the response is a tool call
	  if (typeof result === "string") {
		console.log("Message response: ", result);
	  } else {
		console.log("The result is a ToolInterface[]");
		this.actions = result; // Update actions setelah promise selesai
	  }
	} catch (error) {
	  console.error("Error in generateAction:", error);
	}
  }

  performAction() {	
	if (this.actions.length === 0) {
	  console.log("No action to perform");
	  return;
	} else {
	  this.actions.forEach((action: ToolInterface) => {
		console.log("Performing action: ", action);
		this.callDynamicMethod(action.name, action.arguments);
	  }
	  );
	}
  }

  private callDynamicMethod(methodName: string, ...args: any[]): void {
        // Periksa apakah metode ada pada instance dan merupakan fungsi
        if (typeof (this.instance as any)[methodName] === "function") {
            const result = (this.instance as any)[methodName](...args); // Memanggil metode
            console.log(result);
        } else {
            console.log(`Method "${methodName}" not found on the class instance.`);
        }
    }

}

export default ActionManager;
