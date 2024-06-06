#include<stdio.h>
#include"startup.h"


int main() {
	porttype port = 80;
	porttype server_sock = startup(&port);
	printf("http服务已启动，正在监听...\n端口号：%d\n", port);
	struct sockaddr_in client_addr;
	int client_addr_len = sizeof(client_addr);
	while (true) {
		//等待user访问
		int client_sock = accept(server_sock, (sockaddr*)&client_addr, &client_addr_len);
		if (client_sock == -1) {
			error_die("accept() error!");
		}
		DWORD threadID = 0;
		CreateThread(0, 0, accept_request, (void*)client_sock, 0, &threadID); //创建新的线程 处理user访问


	}
	closesocket(server_sock);

	//system("pause");
	return 0;
}