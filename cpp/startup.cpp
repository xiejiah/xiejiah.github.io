#include "startup.h"


int startup(unsigned short int* port) {
	WSADATA data;
	int ret = WSAStartup(MAKEWORD(1, 1), &data);	//网络初始化，1.1版本协议
	if (ret < 0) {
		error_die("WSAStartup()");
	}

	int server_socket = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);	//创建套件字
	if (server_socket == -1) {
		error_die("创建套件字错误");
	}

	const char opt = '1';
	ret = setsockopt(server_socket, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));	//设置port复用性
	if (ret < 0) {
		error_die("设置port复用性setsockopt错误");
	}

	struct sockaddr_in server_addr;	//配置服务器地址
	memset(&server_addr, 0, sizeof(server_addr));
	server_addr.sin_family = AF_INET;	//网络地址类型（TCP）
	server_addr.sin_port = htons(*port);	//host to net short
	server_addr.sin_addr.s_addr = htonl(INADDR_ANY);	//(IP) host to net long

	ret = bind(server_socket, (struct sockaddr*)&server_addr, sizeof(server_addr));	//绑定套件字到服务器地址
	if (ret < 0) {
		error_die("绑定套件字错误");
	}

	ret = listen(server_socket, 5);	//创建监听队列
	if (ret < 0) {
		error_die("创建监听队列错误");
	}

	if (*port == 0) {	
		int namelen = sizeof(server_addr);
		ret = getsockname(server_socket, (sockaddr*)&server_addr, &namelen);	//动态分配port
		if (ret < 0) {
			error_die("动态分配port错误");
		}
		*port = server_addr.sin_port;
	}
	return server_socket;
}
