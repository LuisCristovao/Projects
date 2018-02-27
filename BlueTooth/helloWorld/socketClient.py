# -*- coding: utf-8 -*-
"""
Created on Tue Feb 27 15:33:54 2018

@author: lcristovao
"""

"""
A simple Python script to send messages to a sever over Bluetooth
using PyBluez (with Python 2).
"""

import bluetooth

serverMACAddress = '00:1f:e1:dd:08:3d'
port = 3
s = bluetooth.BluetoothSocket(bluetooth.RFCOMM)
s.connect((serverMACAddress, port))
while 1:
    text = bluetooth.raw_input() # Note change to the old (Python 2) raw_input
    if text == "quit":
        break
    s.send(text)
s.close()