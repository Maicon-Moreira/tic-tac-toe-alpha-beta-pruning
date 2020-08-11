#include <stdio.h>
#include <math.h>

extern int checkWinner();
extern int heuristic();
extern int alphabeta();

int checkWinner(int grid[25]);
int heuristic(int grid[25]);
int alphabeta(int grid[25], int depth, int alpha, int beta, int maximizing, int searchOrder[50]);
int max(int a, int b);
int min(int a, int b);

int main() {
    return 0;
}

int checkWinner(int grid[25]) {
    int counter = 0;

    int x, y, distance;
    for (x = 0; x < 5; x++) {
        for (y = 0; y < 5; y++) {
            int player = grid[x + y*5];
            if (player != 0) {
                counter++;

                //   horizontal
                for (distance = 1; distance < 4; distance++) {
                    if (grid[x + distance+y*5] == player) {
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
                    if (grid[x+(y + distance)*5] == player) {
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
                    if (grid[x + distance+(y + distance)*5] == player) {
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
                    if (grid[x + distance+(y - distance)*5] == player) {
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

int heuristic(int grid[25]) {
    int value = 0;
    int counter = 0;

    int x, y, distance;
    for (x = 0; x < 5; x++) {
        for (y = 0; y < 5; y++) {
            int player = grid[x + y*5];
            if (player != 0) {

                // horizontal
                counter = 0;
                for (distance = 1; distance < 4; distance++) {
                    if (grid[x + distance+y*5] == player) {
                        counter++;
                    }
                    else if (grid[x + distance+y*5] != 0) {
                        break;
                    }
                    if (distance == 3) {
                        value += player * (pow(10, counter));
                    }
                }

                // vertical
                counter = 0;
                for (distance = 1; distance < 4; distance++) {
                    if (grid[x+(y + distance)*5] == player) {
                        counter++;
                    }
                    else if (grid[x+(y + distance)*5] != 0) {
                        break;
                    }
                    if (distance == 3) {
                        value += player * (pow(10, counter));
                    }
                }


                // diagonal
                counter = 0;
                for (distance = 1; distance < 4; distance++) {
                    if (grid[x + distance+(y + distance)*5] == player) {
                        counter++;
                    }
                    else if (grid[x + distance+(y + distance)*5] != 0) {
                        break;
                    }
                    if (distance == 3) {
                        value += player * (pow(10, counter));
                    }
                }


                // anti-diagonal
                counter = 0;
                for (distance = 1; distance < 4; distance++) {
                    if (grid[x + distance+(y - distance)*5] == player) {
                        counter++;
                    }
                    else if (grid[x + distance+(y - distance)*5] != 0) {
                        break;
                    }
                    if (distance == 3) {
                        value += player * (pow(10, counter));
                    }
                }
            }
        }
    }

    return value;
}

int calculations = 0;
int pruning = 0;

int alphabeta(int grid[25], int depth, int alpha, int beta, int maximizing, int searchOrder[50]) {
    calculations++;

    int winner = checkWinner(grid);
    if (depth == 0 || winner != -10000) {
        return heuristic(grid);
    }

    // maximizing
    if (maximizing == 1) {
        int maxValue = -100000;

        int i = 0;
        for (i = 0; i < 25; i++) {
            int x = searchOrder[i*2];
            int y = searchOrder[i*2 + 1];

            if (grid[x+y*5] == 0) {
                grid[x+y*5] = 1;

                int value = alphabeta(grid, depth - 1, alpha, beta, 0, searchOrder);
                maxValue = max(maxValue, value);
                alpha = max(alpha, value);

                grid[x+y*5] = 0;

                if (beta <= alpha) {
                    pruning++;
                    return maxValue;
                }
            }
        }

        return maxValue;
    }

    // minimizing
    else {
        int minValue = 100000;

        int i = 0;
        for (i = 0; i < 25; i++) {
            int x = searchOrder[i*2];
            int y = searchOrder[i*2 + 1];

            if (grid[x+y*5] == 0) {
                grid[x+y*5] = -1;

                int value = alphabeta(grid, depth - 1, alpha, beta, 1, searchOrder);
                minValue = min(minValue, value);
                beta = min(beta, value);

                grid[x+y*5] = 0;

                if (beta <= alpha) {
                    pruning++;
                    return minValue;
                }
            }
        }

        return minValue;
    }
}

int max(int a, int b) {
    if (a >= b) {
        return a;
    }
    else {
        return b;
    }
}

int min(int a, int b) {
    if (a <= b) {
        return a;
    }
    else {
        return b;
    }
}