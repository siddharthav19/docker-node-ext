#include <bits/stdc++.h>
using namespace std;

int main()
{
  int a;
  cin >> a;
  vector<int> ans(a);
  for (auto &it : ans)
    cin >> it;
  for (auto &it : ans)
    cout << it << " ";
}