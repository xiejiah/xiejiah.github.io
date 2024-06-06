#pragma once
#include <WinSock2.h>
#pragma comment(lib, "WS2_32.lib")
#include <string.h>
#include <vector>
#include <string>
#include <fstream>
#include <sys/types.h>
#include <sys/stat.h>
#include <stdio.h>

/*print getline info*/
#define PRINTF(str) printf("[%s - %d]"#str"=%s\n", __func__, __LINE__,str);	

/*处理user请求*/
DWORD WINAPI accept_request(LPVOID);

/*读socket一行数据*/
int get_line(SOCKET, char*, int);

/*向套件字发送一个提示错误页面*/
void unimplement(int);

/*向套件字发送一个 404 notfound页面*/
void not_found(int);

/*向套件字发送资源*/
void server_file(int, const char*);

/*发送响应包头信息*/
void headers(int, const char*);

/*发送请求的资源信息*/
void cat(int, FILE*);

/*获取文件类型*/
const char* getHeadType(const char*);
