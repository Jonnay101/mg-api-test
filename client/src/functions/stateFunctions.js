module.exports = {
    getPresetsAndSetState: function (URI, self, newStateObj = {}, cbFunc) {
        // takes a URI - this keyword - optional state object - callback function
        // makes a GET request and returns all the current FXs presets to this.state
        fetch(URI)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('GET request has failed. Currently unable to load your presets, sorry!');
                }
            })
            .then(data => {
                if (typeof newStateObj === 'object') {
                    self.setState({...newStateObj, presets: data}, () => cbFunc ? cbFunc() : null);
                } else {
                    self.setState({presets: data}, () => cbFunc ? cbFunc() : null);
                }                
            })
            .catch(err => self.setState({error: err}))
    },
    getPresetList: function (URI, newStateObj = {}) {
        // takes a URI and an optional state object. returns a promise. (neater than above)
        return fetch(URI)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('GET request has failed. Currently unable to load your presets, sorry!');
                }
            })
            .then(data => {
                if (typeof newStateObj === 'object') {
                    return {...newStateObj, presets: data}
                }                
            })
            .catch(err => {
                return {error: err}
            })
    },
    postPreset: function (URI, preset) {
        // takes a preset and saves it ot the data base returns saved preset
        return fetch(URI, {
            method: 'POST',
            body: JSON.stringify(preset), 
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('POST request failed. Currently unable to save your preset, sorry!');
                }
            })
            .then(data => {
                return {currPreset: data}
            })
            .catch(err => {
                return {error: err}
            })
    }

}