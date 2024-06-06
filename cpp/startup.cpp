#include "startup.h"


int startup(unsigned short int* port) {
	WSADATA data;
	int ret = WSAStartup(MAKEWORD(1, 1), &data);	//�����ʼ����1.1�汾Э��
	if (ret < 0) {
		error_die("WSAStartup()");
	}

	int server_socket = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);	//�����׼���
	if (server_socket == -1) {
		error_die("�����׼��ִ���");
	}

	const char opt = '1';
	ret = setsockopt(server_socket, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));	//����port������
	if (ret < 0) {
		error_die("����port������setsockopt����");
	}

	struct sockaddr_in server_addr;	//���÷�������ַ
	memset(&server_addr, 0, sizeof(server_addr));
	server_addr.sin_family = AF_INET;	//�����ַ���ͣ�TCP��
	server_addr.sin_port = htons(*port);	//host to net short
	server_addr.sin_addr.s_addr = htonl(INADDR_ANY);	//(IP) host to net long

	ret = bind(server_socket, (struct sockaddr*)&server_addr, sizeof(server_addr));	//���׼��ֵ���������ַ
	if (ret < 0) {
		error_die("���׼��ִ���");
	}

	ret = listen(server_socket, 5);	//������������
	if (ret < 0) {
		error_die("�����������д���");
	}

	if (*port == 0) {	
		int namelen = sizeof(server_addr);
		ret = getsockname(server_socket, (sockaddr*)&server_addr, &namelen);	//��̬����port
		if (ret < 0) {
			error_die("��̬����port����");
		}
		*port = server_addr.sin_port;
	}
	return server_socket;
}
