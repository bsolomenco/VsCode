#include "f.hpp"
#include <cstdio>
#include <cstdlib>

int main(){
    printf("%s %s()\n", __FILE__, __func__);
    f();
    printf("TEST_ENV: %s\n", getenv("TEST_ENV"));
    return 0;
}