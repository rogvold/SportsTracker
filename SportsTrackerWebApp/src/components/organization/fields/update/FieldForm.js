/**
 * Created by sabir on 16.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var createReactClass = require('create-react-class');

var FieldForm= createReactClass({
    getDefaultProps: function () {
        return {
            name: '',
            width: 0,
            height: 0,
            description: '',

            onSubmit: function(data){

            },

            extraContent: null

        }
    },

    getInitialState: function () {
        return {
            name: this.props.name,
            description: this.props.description,
            width: this.props.width,
            height: this.props.height,
            changed: false
        }
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            name: nextProps.name,
            description: nextProps.description,
            width: nextProps.width,
            height: nextProps.height,
            changed: false
        });
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },

        formPlaceholder: {

        },

        buttonPlaceholder: {
            marginTop: 10
        }


    },

    onNameChange: function(evt){
        this.setState({
            name: evt.target.value,
            changed: true
        });
    },

    onDescriptionChange: function(evt){
        this.setState({
            description: evt.target.value,
            changed: true
        });
    },


    onWidthChange: function(evt){
        this.setState({
            width: evt.target.value,
            changed: true
        });
    },

    onHeightChange: function(evt){
        this.setState({
            height: evt.target.value,
            changed: true
        });
    },

    getData: function(){
        return {
            name: this.state.name,
            description: this.state.description,
            width: this.state.width,
            height: this.state.height
        }
    },

    isEmpty: function(s){
        return (s == undefined || s.trim() == '');
    },

    canSubmit: function(){
        if (this.state.changed == false){
            return false;
        }
        var d = this.getData();
        if (this.isEmpty(d.name) == true){
            return false;
        }
        var width = +this.state.width;
        var height = +this.state.height;
        if (isNaN(width) == true || isNaN(height) == true){
            return false;
        }
        return true;
    },

    onSubmit: function(){
        var data = this.getData();
        this.props.onSubmit(data);
    },

    render: function () {
        var canSubmit = this.canSubmit();

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.formPlaceholder} className={'ui form'} >

                    <div className={'field'}>
                        <label>
                            Название поля
                        </label>
                        <input type={'text'} value={this.state.name} onChange={this.onNameChange} placeholder={'Название поля'} />
                    </div>

                    {true == true ? null :
                        <div className={'field'}>
                            <label>
                                Описание поля
                            </label>
                            <textarea value={this.state.description} onChange={this.onDescriptionChange} placeholder={'Описание поля'} ></textarea>
                        </div>
                    }


                    <div className={'field'}>
                        <label>
                            Длина поля (большая из двух длин)
                        </label>
                        <input type={'text'} value={this.state.height} onChange={this.onHeightChange} placeholder={'Длина поля'} />
                    </div>

                    <div className={'field'}>
                        <label>
                            Ширина поля (меньшая из двух длин)
                        </label>
                        <input type={'text'} value={this.state.width} onChange={this.onWidthChange} placeholder={'Ширина поля'} />
                    </div>

                </div>

                {this.props.extraContent == undefined ? null : this.props.extraContent}

                <div style={this.componentStyle.buttonPlaceholder} className={'ui form'}>
                    <button className={'ui fluid patientPrimary button'} disabled={!canSubmit}
                                                                         onClick={this.onSubmit} >
                        <i className={'icon save'} ></i> Сохранить
                    </button>
                </div>

            </div>
        );
    }

});

module.exports = FieldForm;