#define _CRT_SECURE_NO_WARNINGS
#include "httpsocket.h"
#include <ctype.h>

DWORD WINAPI accept_request(LPVOID arg) {
	char buff[1024];
	int client = (SOCKET)arg;	//客户端socket
	int numchars = get_line(client, buff, sizeof(buff));
	//PRINTF(buff);

	char str[255];
	int i = 0, j = 0;
	while (i < sizeof(buff) && j < sizeof(str) - 1 && buff[i] != ' ') {	//读非sapce字符
		str[j++] = buff[i++];
	}
	str[j] = 0;
	//PRINTF(str);

	if (_stricmp(str, "GET") != 0 && _stricmp(str, "POST") != 0) {	//检查请求格式,if ch1=ch2, then return 0
		unimplement(client);
		return 0;
	}

	/*解析请求的资源文件路径*/
	char url[255];
	while (i < sizeof(buff) && buff[i] == ' ') {	//跳过space
		i++;
	}

	j = 0;
	while (j < sizeof(url) - 1 && i < sizeof(buff) && buff[i] != ' ') {	//读非sapce字符
		url[j++] = buff[i++];
	}
	url[j] = 0;
	//PRINTF(url);

	/*get server's real html address*/
	char path[255];
	sprintf_s(path, "html%s", url);	// "D:\c2019\C工程\Myhttp\index.html"
	if (path[strlen(path) - 1] == '/') {	//若'/'后无其他字符，默认请求 "html\index.html"
		strcat_s(path, "index.html");
	}
	PRINTF(path);

	/*处理未找到资源*/
	struct stat state;
	if (stat(path, &state) == -1) {
		not_found(client);
	}
	else {
		if ((state.st_mode & S_IFMT) == S_IFDIR) {
			strcat_s(path, "/index.html");
		}
		server_file(client, path);
	}
	closesocket(client);
	return 0;
}


int get_line(SOCKET sock, char* buff, int size) {
	char ch = 0;
	int i = 0;
	int ret;
	while (i < size - 1 && ch != '\n') {
		ret = recv(sock, &ch, 1, 0);
		if (ret > 0) {
			if (ch == '\r') {
				ret = recv(sock, &ch, 1, MSG_PEEK);
				if (ch == '\n' && ret > 0) {
					recv(sock, &ch, 1, 0);
				}
				else {
					ch = '\n';
				}
			}
			buff[i++] = ch;
		}
		else {
			ch = '\n';
		}
	}
	if (i < 0) printf("i=%d [%d]", i,__LINE__);
	buff[i] = 0;
	return i;
}


void unimplement(int client) {

}


void not_found(int client) {
	server_file(client, "html/404.html");
}


void server_file(int client, const char* filename) {
	int  numchars = 1;
	char buff[1024];
	numchars = get_line(client, buff, sizeof(buff));
	while (numchars > 0 && strcmp(buff, "\n") != 0) {	//把数据包剩余内容读完
		numchars = get_line(client, buff, sizeof(buff));
		//PRINTF(buff);
	}

	FILE* resourse = NULL;
	if (strcmp(filename, "html/index.html") == 0) {
		resourse = fopen(filename, "rb");
	}
	else {
		resourse = fopen(filename, "rb");
	}
	if (resourse == NULL) {
		not_found(client);
	}
	else {
		headers(client,getHeadType(filename));
		cat(client, resourse);
		printf("资源文件发送完毕！");
	}
	fclose(resourse);
}


void headers(int client,const char* filetype) {
	char buff[1024];
	strcpy(buff, "HTTP/1.0 200 OK\r\n");
	send(client, buff, strlen(buff), 0);
	strcpy(buff, "Server: Xjhttp/0.1\r\n");
	send(client, buff, strlen(buff), 0);
	char str[255];
	sprintf(str, "Content-type:%s\r\n", filetype);
	send(client, str, strlen(str), 0);
	strcpy(buff, "\r\n");
	send(client, buff, strlen(buff), 0);
}




void cat(int client, FILE* resourse) {
	char buff[4096];
	int ret = 1;
	int cnt = 0;
	while (ret > 0) {

		ret = fread(buff, sizeof(char), sizeof(buff), resourse);

		send(client, buff, ret, 0);
		//PRINTF(buff);
		cnt += ret;
	}
	printf("一共发送[%d]个字节", cnt);
}


const char* getHeadType(const char* filename) {
	const char* ret = "text/html";
	const char* p = strrchr(filename,'.');
	if (!p) return ret;
	else {
		p++;
		if (!_stricmp(p, "css")) ret = "text/css";
		if (!_stricmp(p, "jpg")) ret = "image/jpeg";
		if (!_stricmp(p, "png")) ret = "image.png";
		if (!_stricmp(p, "js")) ret = "application/x-javascript";
	}
	return ret;
}
