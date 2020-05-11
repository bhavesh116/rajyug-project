import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { cloneDeep } from 'lodash';
import styled, { keyframes } from 'styled-components';
import { userLogin } from '../../redux/actions/auth';
import RajyugLogo from '../../static/rajyug.jpg';

const Wrapper = styled.div`
 height: 100%;
 width: 100%;
 display: flex;
 flex-direction: column;
 align-items: center;
`

const Header = styled.div`
 display: flex;
 height: 200px;
 width: 395px;
 background-image: url(${RajyugLogo});
`

const AuthDiv = styled.div`
 height: 500px;
 width: 400px;
 border-radius: 5px;
 border: 1px solid ${({theme}) => theme.primary};
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
`
const StyledInput = styled.input`
 height: 40px;
 width: 75%;
 border: 0px;
 border-bottom: 1px solid ${({theme}) => theme.secondary};
 display: flex;
 margin-bottom: 10px;
 align-items: center;
 color: ${({theme}) => theme.orangeRed};
 padding-left: 10px;
`

const Button = styled.div`
 height: 50px;
 width: 50%;
 display: flex;
 justify-content: center;
 align-items: center;
 font-size: 20px;
 color: ${({theme}) => theme.white};
 background-color: ${({theme}) => theme.orangeRed};
 border-radius: 5px;
 margin-top: 20px;
 cursor: pointer;
`

const InputBox = styled.div`
 display: flex;
 width: 100%;
 justify-content: center;
 align-items: center;
 flex-direction: column;
`

const RequiredDiv = styled.div`
 font-size: 14px;
 position: relative;
 margin-right: 219px;
 color: red;
`

const InvaliDiv = styled.div`
 height: 40px;
 background-color: ${({theme}) => theme.orangeRed};
 width: 100%;
 display: flex;
 font-size: 20px;
 color: ${({theme}) => theme.white};
 align-items: center;
 justify-content: center;
 bottom: 144px;
 flex-direction: column;
 position: relative;
`

const Auth = (props) => {
  const initialState = {
    required: [],
    invalid: false
  }
  const dispatch = useDispatch()
  const [state, updateState] = useState(initialState)
  const { history } = props
  const fields = [ { label: "User", key: "user" }, { label: "Password", key: "password" } ]

  const handleChange = (path, value) => {
    let upStat = cloneDeep(state)
    upStat[path] = value
    updateState({
      ...upStat
    })
  } 

  const submitSignIn = () => {
    const required = []
    fields.map(itm => {
      if(!state[itm.key]) {
        required.push(itm.key)
      }
    })

    let upStat = cloneDeep(state)
    upStat.required = required
    if ( required.length === 0 ) {
      let obj = {}
      upStat.invalid = false
      if (state.user === 'Admin' && state.password === 'Admin') {
         dispatch(userLogin({userType: "Admin"}))
         history.replace('/console')
      }
      else if (state.user === 'User' && state.password === 'User') {
        dispatch(userLogin({userType: "User"}))
        history.replace('/console')
      } else {
        upStat.invalid = true
      }
    }
    updateState({
      ...upStat
    })
  }

  return (
      <Wrapper>
        <Header/>
        <AuthDiv>
          {
            state.invalid && 
            <InvaliDiv>Invalid Credentials</InvaliDiv>
          }
           {
             fields.map(itm => {
               return (
                 <InputBox>
                 {
                   state.required.includes(itm.key) &&
                   <RequiredDiv>Required*</RequiredDiv>
                 }
                 <StyledInput
                   key={itm.key}
                   placeholder={itm.label}
                   type={itm.key === 'password' && 'password'}
                   onChange={(event) => handleChange(itm.key, event.target.value)}
                 />
                 </InputBox>
               )
             })
           }
           <Button onClick={submitSignIn}>
             Sign In
           </Button>
        </AuthDiv>
      </Wrapper>
  )
}

export default Auth