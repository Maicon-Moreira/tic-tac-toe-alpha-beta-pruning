#include <stdio.h>

extern int test();
extern int checkWinner();

int main() {
    return 0;
}

int test(int lista[5][5]) {
    return lista[1][1];
}

int getScore(int grid[5][5], int searchOrder[25][2], int depth, int maximizing) {
    int calculations = 0;
    int pruning = 0;

    return 0;
}


int checkWinner(int grid[5][5]) {
    int counter = 0;

    // printf(grid);

    int x, y, distance;
    for (x = 0; x < 5; x++) {
        for (y = 0; y < 5; y++) {
            int player = grid[x][y];
            if (player != 0) {
                counter++;

                //   horizontal
                for (distance = 1; distance < 4; distance++) {
                    if (grid[x + distance][y] == player) {
                        if (distance == 3) {
                            return player;
                        }
                    }
                    else {
                        break;
                    }
                }

                // vertical
                for (distance = 1; distance < 4; distance++) {
                    if (grid[x][y + distance] == player) {
                        if (distance == 3) {
                            return player;
                        }
                    }
                    else {
                        break;
                    }
                }

                // diagonal
                for (distance = 1; distance < 4; distance++) {
                    if (grid[x + distance][y + distance] == player) {
                        if (distance == 3) {
                            return player;

                        }
                    }
                    else {
                        break;
                    }
                }

                // anti-diagonal
                for (distance = 1; distance < 4; distance++) {
                    if (grid[x + distance][y - distance] == player) {
                        if (distance == 3) {
                            return player;
                        }
                    }
                    else {
                        break;
                    }
                }

            }
        }
    }

    if (counter == 25) {
        return 0;
    }
    else {
        return -10000;
    }
}