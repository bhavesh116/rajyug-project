import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cloneDeep } from 'lodash'
import { userLogin } from '../../redux/actions/auth';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
 height: 100%;
 width: 100%;
 display: flex;
 flex-direction: column;
`

const Header = styled.div`
 height: 60px;
 width: 100%;
 background-color: ${({theme}) => theme.white};
 display: flex;
 font-weight: 600;
 align-items: center;
 justify-content: flex-end;
 padding: 0px 20px;
 color: ${({theme}) => theme.orangeRed};
`

const Icon = styled.i`
 color: ${({theme}) => theme.orangeRed};
 transform: scale(1.7);
 margin: 0px 20px;
 ${({small}) => small && css`
 transform: scale(1.2);
 `};

 ${({log}) => log && css`
  cursor: pointer;
 `};
 
`

const TabWrapper = styled.div`
 height: 95%;
 width: 100%;
 background-color: #f1f1f1;
`

const Footer = styled.div`
 height: 5%;
 width: 100%;
 background-color: ${({theme}) => theme.orangeRed};
`

const TabSection = styled.div`
 height: 60px;
 width: 100%;
 display: flex;
 padding: 0px 30px;
 align-items: center;
 justify-content: space-between;
 border-bottom: 1px solid ${({theme}) => theme.orangeRed};
`

const TabContents = styled.div`
 height: 100%;
 display: flex;
 align-items: center;
`

const Tab = styled.div`
 height: 60px;
 width: 100px;
 display: flex;
 text-align: center;
 align-items: center;
 justify-content: center;
 font-size: 20px;
 font-weight: 500;
 cursor: pointer;
 ${({active}) => active && css`
   border-bottom: 2px solid ${({theme}) => theme.orangeRed};
 `}
`

const PrevNext = styled.div`
 color: ${({theme}) => theme.orangeRed};
 cursor: pointer;
 &:before {
   font-size: 35px;
 }
`

const ContentWrapper = styled.div`
 height: 93%;
 width: 100%;
 display: flex;
 padding: 40px;
`

const Card = styled.div`
 height: 250px;
 width: 200px;
 display: flex;
 flex-direction: column;
 justify-content: space-between;
 padding: 25px;
 background-color: ${({theme}) => theme.white};
 border: 1px solid ${({theme}) => theme.orangeRed};
 margin: 2px;
 box-shadow: -3px 0px 5px #0000008c;
 transition: all .5s;

 &:hover {
   transform: scale(1.1);
   z-index: 5;
 }
`

const Cardiv = styled.div`
 display: flex;
 width: 100%;
 font-size: 20px;
 ${({bottom}) => bottom && css`
   justify-content: flex-end;
 `}
`

const CardIcon = styled.div`
 color: ${({theme}) => theme.orangeRed};
 &:before {
   font-size: 40px;
 }
`

const LogoutDiv = styled.div`
 position: absolute;
 height: 50px;
 width: 100px;
 top: 60px;
 right: 75px;
 display: flex;
 align-items: center;
 justify-content: center;
 border-radius: 5px;
 cursor: pointer;
 background-color: ${({theme}) => theme.white};
`

const tabs = [
  {
   label:"Hr",
   cards: [
     {cardLabel: "Hr Master", cardIcon:"fas fa-users"},
     {cardLabel: "Hr Transaction", cardIcon:"far fa-calendar-alt"},
     {cardLabel: "Hr Dashboard", cardIcon:"far fa-clipboard"},
    ]
  },
  {
    label:"Finance",
    cards: [
      {cardLabel: "Finance Master", cardIcon:"fas fa-users"},
      {cardLabel: "Finance Transaction", cardIcon:"far fa-calendar-alt"},
      {cardLabel: "Finance Dashboard", cardIcon:"far fa-clipboard"},
     ]
   },
   {
    label:"Inventory",
    cards: []
   },
   {
    label:"Settings",
    cards: []
   },
]

const Console = (props) => {
  const initialState = {
    currentIndex: 0,
    cardData: [],
    userLog: false
  }
  const dispatch = useDispatch()
  const [ state, updateState ] = useState(initialState)

  const consoleState = useSelector(state => state.auth)
  const {
    userType
  } = consoleState

  const dataToMap = (cards) => {
    let arr = cards
    if (userType !== 'Admin') {
      arr = cards.filter(itm => itm.label !== 'Finance')
    }
    return arr;
  }

  useEffect(() => {
    const upStat = initialState
    upStat.cardData = tabs[0].cards
    updateState({
      ...upStat
    })
    if (!userType) {
      props.history.replace('./auth')
    }
  }, [])
    
  const tabChange = (cards, index) => {
     const upStat = cloneDeep(state)
     upStat.currentIndex = index
     upStat.cardData = cards
     if (index >= tabs.length) {
      upStat.currentIndex = (tabs.length - 1)
      upStat.cardData = tabs[3].cards
     }
     if (index < 0) {
      upStat.currentIndex = 0
      upStat.cardData = tabs[0].cards
     }
     if(!cards) {
       upStat.cardData = tabs[upStat.currentIndex].cards
     }
     updateState({
       ...upStat
     })
  }

  const logout = () => {
    dispatch(userLogin({userType: ""}))
    props.history.replace('./auth')
  }

  return (
      <Wrapper>
          <Header>
          <Icon small className="fas fa-bell"/>
          <Icon log onClick={() => updateState({...state, userLog: !state.userLog})} className="fas fa-user-circle"/>
           {
             state.userLog && 
             <LogoutDiv onClick={logout} >Log out</LogoutDiv>
           } 
          {userType || 'Admin'}
          </Header>
          <TabWrapper>
           <TabSection>
             <TabContents>
             <PrevNext onClick={() => tabChange(null, state.currentIndex - 1) } className="fas fa-angle-double-left"/>
             {
               dataToMap(tabs).map((itm, index) => {
                 return (
                   <Tab key={itm.label} onClick={() => tabChange(itm.cards, index)} active={state.currentIndex === index} >
                     {itm.label}
                   </Tab>
                 )
               })
             }
             </TabContents>
             <PrevNext onClick={() => tabChange(null, state.currentIndex + 1) } className="fas fa-angle-double-right"/>
           </TabSection>
            <ContentWrapper>
              {
                state.cardData.map((card) => {
                  return (
                    <Card>
                      <Cardiv>
                        {card.cardLabel}
                      </Cardiv>
                      <Cardiv bottom>
                       <CardIcon className={card.cardIcon} />
                      </Cardiv>
                    </Card>
                  )
                })
              }
            </ContentWrapper>
          </TabWrapper>
          <Footer/>
      </Wrapper>
  )
}

export default Console