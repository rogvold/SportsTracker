/**
 * Created by sabir on 05.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var CoolPreloader = require('../../preloader/CoolPreloader');

var ParametersPanel = require('./ParametersPanel');
var HeadersPanel = require('./HeadersPanel');

var DataHighlightPanel = require('./DataHighlightPanel');

var APIHelper = require('../../../helpers/APIHelper');

var constants = require('../../../constants');

import APIFactory from '../../../data/APIFactory'
var createReactClass = require('create-react-class');
var APIFunctionPanel= createReactClass({
    getDefaultProps: function () {
        return {

            name: 'testFunc',
            requestType: 'POST',
            description: 'this is a test function',

            headers: [
                //{
                //    name: 'X-Parse-Application-Id',
                //    value: 'vqMRbPsF0CVblf6t90mVEIa5GOwkaapBckNnmyle'
                //},
                //{
                //    name: 'X-Parse-REST-API-Key',
                //    value: 'Q3jemdZWv6PUJANR6rVe6TekLWuCdypUE7eva4x6'
                //},
                //{
                //    name: 'Content-Type',
                //    value: 'application/json'
                //}
            ],

            parameters: [{
                name: 'name',
                description: 'task name',
                paramType: "string",
                isRequired: true,
            }, {
                name: 'description',
                description: 'task description',
                paramType: "string",
                isRequired: false
            },{
                name: 'start',
                description: 'start timestamp',
                paramType: 'number',
                isRequired: false
            }],

            editable: true

        }
    },

    getInitialState: function () {
        return {
            loading: false,
            startTimestamp: undefined,
            finishTimestamp: undefined,
            data: undefined,
            response: undefined,
            error: undefined,
            headers: this.props.headers
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            position: 'relative',
            width: 1020,
            padding: 10,
            margin: '0 auto',
            backgroundColor: 'white',
            border: '1px solid #CFD8DC',
            borderRadius: 4,
            marginTop: 10
        },

        parametersPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 390,
            paddingLeft: 10,
            marginRight: 10,
            backgroundColor: '#4562B0',
            paddingBottom: 0,
            borderRadius: 4
        },

        headersPlaceholder: {
            paddingTop: 10,
            paddingLeft: 10,
            paddingBottom: 10,
            backgroundColor: '#E8EAF6'
        },

        dataPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 598,
            padding: 10,
            backgroundColor: '#F1F8E9',
            borderRadius: 4
        },

        data: {
            border: '1px solid lightgrey',
            borderRadius: 4,
            padding: 10
        },

        namePlaceholder: {
            fontSize: 18,
            lineHeight: '18px',
            fontWeight: 'bold'
        },

        descriptionPlaceholder: {
            opacity: 0.6,
            fontSize: 14
        },

        submitButtonPlaceholder:{
            marginTop: 10,
            textAlign: 'right'
        },

        curlPlaceholder: {
            marginTop: 10
        },

        responsePlaceholder: {
            padding: 10,
            backgroundColor: '#81C784',
            borderRadius: 4,
            marginTop: 10
        },

        errorPlaceholder: {
            padding: 10,
            backgroundColor: '#FFCCBC',
            borderRadius: 4,
            color: '#DD2C00',
            marginTop: 10
        }

    },

    onChange: function(data){
        this.setState({
            data: data
        });
    },



    canSubmit: function(){
        var data = this.state.data;
        var parameters = this.props.parameters;
        var headers = this.state.headers;

        if (data == undefined && parameters.length > 0){
            return false;
        }

        for (var i in parameters){
            var p = parameters[i];
            if (data[p.name] == undefined && p.isRequired == true){
                return false;
            }
        }
        for (var i in headers){
            var h = headers[i];
            if (h.value == undefined || h.value.trim() == ''){
                return false;
            }
        }
        return true;
    },

    send: function(callback, errorCallback){
        // var url = 'https://api.parse.com/1/functions/' + this.props.name;
        // var url = constants.PARSE_SERVER_URL + '/functions/' + this.props.name;
        // var url = constants.SERVER_DOMAIN + '/v1/' + this.props.name;
        var url = APIFactory.BASE + this.props.name;


        APIHelper.sendRequest(this.state.headers, this.state.data == undefined ? undefined : {data: this.state.data}, url, this.props.requestType, function(data){
            callback(data);
        }, function(err){
            errorCallback(err);
        });
    },

    onSubmit: function(){
        this.setState({
            loading: true,
            startTimestamp: (new Date()).getTime(),
            endTimestamp: undefined,
            response: undefined,
            error: undefined
        });
        this.send(function(resp){
            this.setState({
                loading: false,
                finishTimestamp: (new Date()).getTime(),
                response: resp,
                error: undefined
            });
        }.bind(this), function(err){
            this.setState({
                loading: false,
                finishTimestamp: (new Date()).getTime(),
                response: undefined,
                error: err
            });
        }.bind(this));
    },

    onHeadersChange: function(newHeaders){
        this.setState({
            headers: newHeaders
        });
    },

    render: function () {
        var canSubmit = this.canSubmit();
        var data = {
            data: this.state.data
        };
        // var url = 'https://api.parse.com/1/functions/' + this.props.name;

        // var url = constants.PARSE_SERVER_URL + '/functions/' + this.props.name;
        // var url = constants.SERVER_DOMAIN + '/v1/' + this.props.name;
        var url = APIFactory.BASE + this.props.name;


        var curlString = APIHelper.getCurlString(this.state.headers, this.state.data == undefined ? undefined : data, url, this.props.requestType);
        curlString = curlString.replace(/\n/g, ' ');

        return (
            <div  className={'api_function_panel'} >

                <div className={'name_placeholder'} >
                    {this.props.name}
                </div>

                <div className={'description_placeholder'} >
                    {this.props.description}
                </div>

                <div style={{marginTop: 20}} >

                    <div className={'parameters_placeholder'} >

                        <div className={'headers_placeholder'} >
                            <div>
                                <span className="ui blue tag label" >
                                    Headers:
                                </span>
                            </div>
                            <HeadersPanel headers={this.props.headers} onChange={this.onHeadersChange} />
                        </div>

                        <div style={{padding: 10, paddingRight: 0, backgroundColor: '#B2EBF2'}} >
                            <div >
                                <span className="ui blue tag label" >
                                    Parameters:
                                </span>
                            </div>
                            <ParametersPanel
                                parameters={this.props.parameters}
                                onChange={this.onChange}
                                editable={this.props.editable}
                                />
                        </div>

                    </div>

                    <div className={'data_placeholder'} >
                        <label>
                            <b>
                                DATA:
                            </b>
                        </label>
                        <div style={this.componentStyle.data}>
                            <DataHighlightPanel data={data} />
                        </div>

                        <div style={this.componentStyle.curlPlaceholder} className={'ui form'} >
                            <label>
                                <b>
                                    CURL command:
                                </b>
                            </label>
                            <textarea value={curlString} ></textarea>
                        </div>

                        {this.state.response == undefined ? null :
                            <div style={this.componentStyle.responsePlaceholder}>
                                <div>
                                    Response:
                                </div>
                                <DataHighlightPanel data={this.state.response} />
                            </div>
                        }

                        {this.state.error == undefined ? null :
                            <div style={this.componentStyle.errorPlaceholder}>
                                <div>
                                    Error:
                                </div>
                                <DataHighlightPanel data={this.state.error} />
                            </div>
                        }

                    </div>



                </div>


                <div style={this.componentStyle.submitButtonPlaceholder}>
                    <button className={'ui patientPrimary button'} style={{marginRight: 0}}
                            onClick={this.onSubmit} disabled={!canSubmit} >
                        Submit
                    </button>
                </div>

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = APIFunctionPanel;