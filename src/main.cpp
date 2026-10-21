#include "f.hpp"
#include <cstdio>
#include <cstdlib>

int main(){
    printf("Hello, World!\n");
    f();
    printf("TEST_ENV: %s\n", getenv("TEST_ENV"));
    return 0;
}