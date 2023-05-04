#include <stdio.h>
int main(int argc,char **argv){
    for(int i=0;i<argc;i++){
        if(i==0)
            printf("Built Executable  Name : %s\n",argv[i]);//Executable name of our C program
        else
            printf("%d. %s\n",i,argv[i]);//argv[i] is the argument passed to our C program
    }
    return 0;
}
