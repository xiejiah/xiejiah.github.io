#include<stdio.h>
#include"startup.h"


int main() {
	porttype port = 80;
	porttype server_sock = startup(&port);
	printf("http���������������ڼ���...\n�˿ںţ�%d\n", port);
	struct sockaddr_in client_addr;
	int client_addr_len = sizeof(client_addr);
	while (true) {
		//�ȴ�user����
		int client_sock = accept(server_sock, (sockaddr*)&client_addr, &client_addr_len);
		if (client_sock == -1) {
			error_die("accept() error!");
		}
		DWORD threadID = 0;
		CreateThread(0, 0, accept_request, (void*)client_sock, 0, &threadID); //�����µ��߳� ����user����


	}
	closesocket(server_sock);

	//system("pause");
	return 0;
}