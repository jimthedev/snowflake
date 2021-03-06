'use strict';

jest.autoMockOff();

import React,
{
} from 'react-native';
import utils from 'react-addons-test-utils';

import {
  LOGIN_STATE_REGISTER,
  LOGIN_STATE_LOGIN,
  LOGIN_STATE_FORGOT_PASSWORD
} from '../../lib/constants';


jest.dontMock('../LoginForm');
var LoginForm = require('../LoginForm');

var t = require('tcomb-form-native');
let Form = t.form.Form;

describe('LoginForm', () => {

  function renderLoginForm(props) {
    const renderer = utils.createRenderer();
    renderer.render(<LoginForm {...props}/>);
    const output = renderer.getRenderOutput();

    return {
      props,
      output,
      renderer
    };
  }

  function getFields(output) {
    return output.props.options.fields;
  }

  function getValues(output) {
    return output.props.value;
  }

  function checkLoginForm(props) {
    const {output} = renderLoginForm(props);
    expect(output.type,Form);

    const fields = getFields(output);
    const values = getValues(output);
    
    if (props.form.state === LOGIN_STATE_REGISTER
        ||
        props.form.state === LOGIN_STATE_LOGIN) {
      expect(values.username).toEqual(props.value.username);      
      expect(fields.username.editable).toEqual(!props.form.isFetching);
      expect(fields.username.hasError).toEqual(props.form.fields.usernameHasError);

      expect(values.password).toEqual(props.value.password);      
      expect(fields.password.editable).toEqual(!props.form.isFetching);
      expect(fields.password.hasError).toEqual(props.form.fields.passwordHasError);    
      expect(fields.password.secureTextEntry).toEqual(!props.form.fields.showPassword);
    }
    
    if (props.form.state === LOGIN_STATE_FORGOT_PASSWORD
        ||
        props.form.state === LOGIN_STATE_REGISTER) {
      expect(values.email).toEqual(props.value.email);      
      expect(fields.email.editable).toEqual(!props.form.isFetching);
      expect(fields.email.hasError).toEqual(props.form.fields.emailHasError);
    }

    if (props.form.state === LOGIN_STATE_REGISTER) {
      expect(values.passwordAgain).toEqual(props.value.passwordAgain);          
      expect(fields.passwordAgain.editable).toEqual(!props.form.isFetching);
      expect(fields.passwordAgain.hasError).toEqual(props.form.fields.passwordAgainHasError);    
      expect(fields.passwordAgain.secureTextEntry).toEqual(!props.form.fields.showPassword);
    }

  }
  
  ///////////////////////////////////
  describe('LOGIN_STATE_REGISTER', () => {
    it('should display without errors and without values', () => {
      let form = {
        isFetching: false,
        fields: {
          usernameHasError: false,
          emailHasError: false,
          passwordHasError: false,
          passwordAgainHasError: false,
          showPassword: false
        },
        state: LOGIN_STATE_REGISTER
      };

      let value = {
        username: '',
        email: '',
        password: '',
        passwordAgain: ''
      };
      
      let props = {
        form: form,
        value: value,
        onChange: () => {}
      };

      checkLoginForm(props);
    });

    it('should display  errors and  values', () => {
      let form = {
        isFetching: false,
        fields: {
          usernameHasError: true,
          emailHasError: true,
          passwordHasError: true,
          passwordAgainHasError: true,
          showPassword: false
        },
        state: LOGIN_STATE_REGISTER
      };

      let value = {
        username: 'username',
        email: 'email',
        password: 'password',
        passwordAgain: 'passwordagain'
      };
      
      let props = {
        form: form,
        value: value,
        onChange: () => {}
      };

      checkLoginForm(props);
    });


    it('should not be editable if fetching', () => {
      let form = {
        isFetching: true,
        fields: {
          usernameHasError: true,
          emailHasError: true,
          passwordHasError: true,
          passwordAgainHasError: true,
          showPassword: false
        },
        state: LOGIN_STATE_REGISTER
      };

      let value = {
        username: 'username',
        email: 'email',
        password: 'password',
        passwordAgain: 'passwordagain'
      };
      
      let props = {
        form: form,
        value: value,
        onChange: () => {}
      };

      checkLoginForm(props);
    });


    it('password fields are not secured if shown', () => {
      let form = {
        isFetching: false,
        fields: {
          usernameHasError: false,
          emailHasError: false,
          passwordHasError: false,
          passwordAgainHasError: false,
          showPassword: true
        },
        state: LOGIN_STATE_REGISTER
      };

      let value = {
        username: 'username',
        email: 'email',
        password: 'password',
        passwordAgain: 'passwordagain'
      };
      
      let props = {
        form: form,
        value: value,
        onChange: () => {}
      };

      checkLoginForm(props);
    });

  });
  ///////////////////////////////////
  describe('LOGIN_STATE_LOGIN', () => {
    it('should display without errors and without values', () => {
      let form = {
        isFetching: false,
        fields: {
          usernameHasError: false,
          passwordHasError: false,
          showPassword: false
        },
        state: LOGIN_STATE_LOGIN
      };

      let value = {
        username: '',
        password: ''
      };
      
      let props = {
        form: form,
        value: value,
        onChange: () => {}
      };

      checkLoginForm(props);
    });

    it('should display  errors and  values', () => {
      let form = {
        isFetching: false,
        fields: {
          usernameHasError: true,
          passwordHasError: true
        },
        state: LOGIN_STATE_LOGIN
      };

      let value = {
        username: 'username',
        password: 'password'
      };
      
      let props = {
        form: form,
        value: value,
        onChange: () => {}
      };

      checkLoginForm(props);
    });


    it('should not be editable if fetching', () => {
      let form = {
        isFetching: true,
        fields: {
          usernameHasError: true,
          passwordHasError: true,
          showPassword: false
        },
        state: LOGIN_STATE_LOGIN
      };

      let value = {
        username: 'username',
        password: 'password'
      };
      
      let props = {
        form: form,
        value: value,
        onChange: () => {}
      };

      checkLoginForm(props);
    });


    it('password fields are not secured if shown', () => {
      let form = {
        isFetching: false,
        fields: {
          usernameHasError: false,
          passwordHasError: false,
          showPassword: true
        },
        state: LOGIN_STATE_LOGIN
      };

      let value = {
        username: 'username',
        password: 'password'
      };
      
      let props = {
        form: form,
        value: value,
        onChange: () => {}
      };

      checkLoginForm(props);
    });

  });
  ///////////////////////////////////
  ///////////////////////////////////
  describe('LOGIN_STATE_FORGOT_PASSWORD', () => {
    it('should display without errors and without values', () => {
      let form = {
        isFetching: false,
        fields: {
          emailHasError: false,
          showPassword: false
        },
        state: LOGIN_STATE_FORGOT_PASSWORD
      };

      let value = {
        email: ''
      };
      
      let props = {
        form: form,
        value: value,
        onChange: () => {}
      };

      checkLoginForm(props);
    });

    it('should display  errors and  values', () => {
      let form = {
        isFetching: false,
        fields: {
          emailHasError: true
        },
        state: LOGIN_STATE_FORGOT_PASSWORD
      };

      let value = {
        email: 'email'
      };
      
      let props = {
        form: form,
        value: value,
        onChange: () => {}
      };

      checkLoginForm(props);
    });


    it('should not be editable if fetching', () => {
      let form = {
        isFetching: true,
        fields: {
          emailHasError: true,
          showPassword: false
        },
        state: LOGIN_STATE_LOGIN
      };

      let value = {
        username: 'username',
        password: 'password'
      };
      
      let props = {
        form: form,
        value: value,
        onChange: () => {}
      };

      checkLoginForm(props);
    });


    it('password fields are not secured if shown', () => {
      let form = {
        isFetching: false,
        fields: {
          emailHasError: false,
          showPassword: true
        },
        state: LOGIN_STATE_FORGOT_PASSWORD
      };

      let value = {
        email: 'email'
      };
      
      let props = {
        form: form,
        value: value,
        onChange: () => {}
      };

      checkLoginForm(props);
    });

  });
  
});//describe LoginFormTest
