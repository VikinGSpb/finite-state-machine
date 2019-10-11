class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.initialState = 0;
        this.activeState = 0;
        this.states = [];
        this.transitions = [];
        for(let key in config.states)
        {
            this.states.push(key);
            this.transitions.push(config.states[key].transitions);
        }  
        this.statesHistory = [config.initial];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.statesHistory[this.activeState];
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(this.states.includes(state)) {
            this.statesHistory.push(state);
            this.activeState++;
        }
        else throw new Error;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        let element = this.transitions[this.states.indexOf(this.statesHistory[this.activeState])];
        if(Object.keys(element).includes(event)) this.changeState(element[event]);
        else throw new Error;
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.activeState = this.initialState;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if(event === undefined) return this.states;
        let result = [];
        for(let i = 0; i < this.transitions.length; i++) 
        {
            if(Object.keys(this.transitions[i]).includes(event)) result.push(this.states[i]);
        }
        return result;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.activeState < 1) return false;
        else {
            //this.changeState(this.statesHistory[this.statesHistory.length - 2]);
            this.activeState--;
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.statesHistory.length < 2) return false;
        else {
            this.activeState++;
            if (this.activeState > this.statesHistory.length - 1) return false;
            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.activeState = 0;
        this.statesHistory.splice(1, this.statesHistory.length - 1);
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
