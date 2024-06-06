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

/*����user����*/
DWORD WINAPI accept_request(LPVOID);

/*��socketһ������*/
int get_line(SOCKET, char*, int);

/*���׼��ַ���һ����ʾ����ҳ��*/
void unimplement(int);

/*���׼��ַ���һ�� 404 notfoundҳ��*/
void not_found(int);

/*���׼��ַ�����Դ*/
void server_file(int, const char*);

/*������Ӧ��ͷ��Ϣ*/
void headers(int, const char*);

/*�����������Դ��Ϣ*/
void cat(int, FILE*);

/*��ȡ�ļ�����*/
const char* getHeadType(const char*);
