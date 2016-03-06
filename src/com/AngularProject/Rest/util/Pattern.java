package com.AngularProject.Rest.util;

public class Pattern {

	public static void main(String[] args) {
		int n = 7;
		for(int i = 0; i < n ;i++){
			for(int j = 0; j <= i ; j++){
				System.out.print("#");
				if(i >= n/2 ){
					j++;
					if(i+1 == n){
						j++;
					}
				}
			}
			System.out.println("");
		}
	}
}
