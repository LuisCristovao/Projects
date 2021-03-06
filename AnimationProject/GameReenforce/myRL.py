# -*- coding: utf-8 -*-
"""
Created on Mon Mar 19 09:30:52 2018

@author: lcristovao
"""

import GameEnviroment as Env
import random

class Action:
    
    def __init__(self,action):
        #self.state=state
        self.action=action
        self.reward=1

class Actions:
    def __init__(self):
        self.actions=[]


class Brain:
    
    def __init__(self):
        self.brain={}
        #self.size=size
    
    #this action is obj from class Action    
    def SaveMemory(self,state,action):
        equal_action=False
        
        #if brain is empty
        if(not self.brain):
             self.brain[state]=[]
             self.brain[state].append(action)
        else: 
            #if state already exists
            if(self.brain.get(state)!=None):
                _actions=self.brain[state]
                #see for equal action if exists
                for i in range(len(_actions)):
                    if _actions[i].action==action.action:
                        _actions[i].reward+=1
                        equal_action=True
                if(not equal_action):
                    _actions.append(action)
            else:
                self.brain[state]=[]
                self.brain[state].append(action)
        
        
    #state=int[]
    def SelectNearestState(self,state):
        
        
      if(self.brain.get(state)!=None):
          return state
      else:
           Sum=0
           min_difference=0
           j=0
           selected_state=state
           #turn state
           for brain_state in self.brain:
               
               for i in range(len(state)):
                   dif=abs( state[i]-brain_state[i])
                   Sum+=dif
                   
               if j==0:
                   j==1
                   min_difference=Sum
                   selected_state=brain_state
               else:
                   if Sum<min_difference:
                       min_difference=Sum
                       selected_state=brain_state
       
           return selected_state
       
    def SelectBestAction(self,state):
        nearest_state=self.SelectNearestState(state)
        actions=self.brain[nearest_state]
        #get action with highest reward
        for i in range(len(actions)):
            if i==0:
                max_reward=actions[i].reward
                best_action=actions[i]
            else:
                if actions[i].reward>max_reward:
                   max_reward=actions[i].reward
                   best_action=actions[i] 
        
        return best_action
       
    def DoAction(self,state, rand_percentage):
        if len(self.brain)==0:
            return random.randint(0,8) 
        else:
            
            if(random.random()<rand_percentage):
                return random.randint(0,8) 
            else:
                action=self.SelectBestAction(state)
                return action.action              

#Main--------------------------------
brain1=Brain()
brain2=Brain()                
Game=True

game_enviroment=Env.Enviroment()

def Evaluate(status1,status2):
    
    if status1[2]==status2[2]:
        Sum1=status1[0]+status1[1]
        Sum2=status2[0]+status2[1]
        if Sum1>=Sum2:
            return False
        else:
            return True
    else:
        if status1[2]>status2[2]:
            return False
        else:
            return True
        
n_games=0
max_games_num=10
while Game:
        #
        game_state=(game_enviroment.goodStatus[0],game_enviroment.goodStatus[1],game_enviroment.goodStatus[2],game_enviroment.evilStatus[0],game_enviroment.evilStatus[1],game_enviroment.evilStatus[2])
        print(game_state)
        #0-8
        #p1_action=int(input("Move: "))#A:0-2;D:3-5;P:A:6,D:7,8:H;
        p1_action=brain1.DoAction(game_state,1)
        p2_action=brain2.DoAction(game_state,0.1)
        game_enviroment.Run(p1_action,p2_action)
        
        if(Evaluate(game_enviroment.goodStatus,game_enviroment.evilStatus)):
            a=Action(p2_action)
            brain2.SaveMemory(game_state,a) 
        else:
            a=Action(p1_action)
            brain1.SaveMemory(game_state,a) 
            
        if(game_enviroment.goodStatus[2]<=0 or game_enviroment.evilStatus[2]<=0 ):
            Game=False
            

           
for game_state in brain1.brain:
    value=brain1.brain[game_state]
    for i in range(len(value)):
        a=Action(value[i].action)
        brain2.SaveMemory(game_state,a)



            
print('\n')           
for key in brain1.brain:
    value=brain1.brain[key]
    for i in range(len(value)):
        print(key,value[i].action,value[i].reward)
        
print('\n')         
for key in brain2.brain:
    value=brain2.brain[key]
    for i in range(len(value)):
        print(key,value[i].action,value[i].reward)        


        