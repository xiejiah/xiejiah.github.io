#include<stdio.h>
#include<stdlib.h>
#include"error.h"


void error_die(const char* str) {
	perror(str);
	exit(1);
}