import ActionManager from './ActionManager';

// Class for general generating handler
class RevealMDGen {
    private action_manager: ActionManager;

    constructor(action_manager = new ActionManager()) {
        this.action_manager = action_manager;
    }

    async generateSlides(prompt: string) {
		await this.action_manager.generateAction(prompt);
		await this.action_manager.performAction();
    }

    getActionManager(): ActionManager {
        return this.action_manager;
    }
}

export default RevealMDGen;
