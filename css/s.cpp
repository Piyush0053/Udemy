// #include <bits/stdc++.h>
// using namespace std;
 
// char maxOccurring(char* str)
// {
//     int count[256] = {0};
//     int max = INT_MIN;
//     char answer;
 
//     for (int i = 0; str[i] != '\0'; i++) {
//         count[str[i]]++;
//         if (max < count[str[i]]) {
//             max = count[str[i]];
//             answer= str[i];
//         }
//     }
//     return answer;
// }

// int main()
// {
//     char str[] = "piyush mittali";
//     cout << maxOccurring(str);
// }

// #include <bits/stdc++.h>
// using namespace std;

// char *removeDuplicate(char str[], int n) {
//   // str is character array and n is the lenght of the character array
// 	int index = 0;
// 	for (int i=0; i<n; i++) {
// 		int j;
// 		for (j=0; j<i; j++)
// 			if (str[i] == str[j])
// 				str[index++] = str[i];
// 		}
		
// 	return str;
// }
// int main(){
//     char str[]="piyushmittal";
//     int n =sizeof(str)/sizeof(sizeof(str[0]));
//     cout<<removeDuplicate(str,n);
// }

// #include <iostream>  
// using namespace std;  
// int main() {  
//     char char_array[] = {'L','A','K','S','H','A','Y'};  
//     int array_size = sizeof(char_array)/sizeof(char);  
//     string j = "";  
//     int i;  
//     for(i = 0; i < array_size; i++) {    
//         j = j + char_array[i];  
//     }  
//     cout << j <<endl;  
// }

// void reverseString(char input[],int n,int start){
//     for(int i=start,j=n-1+start;i<j;i++,j--){
//         int temp = input[i];
//         input[j] = input[i];
//         input[i] = temp;
//     }
// }

// void reverseEachWord(char input[]) {
//     int start=0,count=1,i=0;
//     while(input[i]!=0){
//         i++;
//         count++;
//         if((input[i]==' ')){
//             reverseString(input,count-1,start);
//             start = i+1;
//             count = 0;
//         }
//     }


// }  
// int main(){
//     int a=5;
//     int *ptr =&a;
//     int *q=ptr;
//     int **pi=*q;
//     cout<<**pi;
// }

#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main()
{
  int z = 0;
  string name[] = {"john", "bobby", "dear", 
                   "test1", "catherine", "nomi", 
                   "shinta", "martin", "abe", 
                   "may", "zeno", "zack", "angeal", "gabby"};

  sort(name[0],name[z]);

  for(int y = 0; y < z; y++)
  {
    cout << name[z] << endl;
  }
  return 0;
}
