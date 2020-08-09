import React, {Component} from 'react';
import NotefulForm from '../NotefulForm/NotefulForm';
import NotefulContext from '../NotefulContext';

export default class AddFolder extends Component {
    constructor() {
        super();
        this.state = {
            error: null,
            name: '',
            nameValid: false,
            validationMessage: ''
        };
    }
    static contextType = NotefulContext;

    isNameValid = e => {
        e.preventDefault();
        if(!this.state.name) {
            this.setState({
                validationMessage: 'Please use a name for the folder.',
                nameValid: false
            });
        } else {
            this.setState(
                {
                    validationMessage: '',
                    nameValid: true
                },
                this.handleAddFolder()
            );
        }
    };

    handleAddFolder = () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name
            })
        };
        console.log(options);

        fetch('http://localhost:9090/folders', options)
        .then(res => {
            if (!res.ok) {
                throw new Error('something wrong happened!');
            }
            return res;
        })
        .then(res => res.json())
        .then(data => {
            this.context.handleAddFolder(data);
        })
        .catch(error => {
            this.setState({
                error: error.message
            });
        });
    };

    nameChange = letter => {
        this.setState({ name: letter});
    };

    render() {
        return (
            <section className='AddFolder'>
                <h2>Create a Folder</h2>
                <NotefulForm
                onSubmit={e =>{
                    this.isNameValid(e);
                }}>
                    <div className='field'>
                        <label htmlFor='folder-name-input'>Name</label>
                        <input
                            type='type'
                            id='folder-name-input'
                            name='folder'
                            onChange={e => this.nameChange(e.target.value)}/>
                            {!this.state.nameValid && (
                                <div>
                                    <p>{this.state.validationMessage}</p>
                                    </div>
                            )}
                    </div>
                    <div className='buttons'>
                        <button type='submit'>Add Folder</button>
                    </div>
                </NotefulForm>
                {this.state.error && (
                    <div>
                        <p>{this.state.error}</p>
                    </div>
                )}
            </section>
        );
    }
}