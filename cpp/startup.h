#pragma once
#include <WinSock2.h>
#pragma comment(lib, "WS2_32.lib")
#include "error.h"
#include "httpsocket.h"
#define porttype unsigned short int



/*实现网络初始化，返回服务器端套件字*/
int startup(unsigned short int*);








