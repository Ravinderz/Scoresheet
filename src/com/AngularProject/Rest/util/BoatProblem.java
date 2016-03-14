package com.AngularProject.Rest.util;

import java.util.ArrayList;
import java.util.Scanner;

public class BoatProblem {

	public static void main(String[] args) {
		ArrayList<String> bank1 = new ArrayList<String>();
		ArrayList<String> bank2 = new ArrayList<String>();
		int choice = 0;
		String status = null;
		boolean success = false;
		bank1.add("Tiger");
		bank1.add("Goat");
		bank1.add("Grass");
		do{
		choice = new BoatProblem().displayMsg();
		switch(choice){
		case 1: 
			if(bank1.contains("Goat")){
				status = BoatProblem.checkStatus(bank1, bank2);
				System.out.println(bank1);
				bank1.remove("Goat");
				bank2.add("Goat");
				System.out.println("Goat is transfered to Bank 2");
			}else{
				status = BoatProblem.checkStatus(bank1, bank2);
					bank2.remove("Goat");
					bank1.add("Goat");
					System.out.println("Goat is transfered to Bank 1");
				}
			break;
		case 2:
			if(bank1.contains("Tiger")){
				status = BoatProblem.checkStatus(bank1, bank2);
			bank1.remove("Tiger");
			bank2.add("Tiger");
			System.out.println("Tiger is transfered to Bank 2");
			}else{
				status = BoatProblem.checkStatus(bank1, bank2);
				bank2.remove("Tiger");
				bank1.add("Tiger");
				System.out.println("Tiger is transfered to Bank 1");
			}
			break;
		case 3:
			if(bank1.contains("Grass")){
			status = BoatProblem.checkStatus(bank1, bank2);
			bank1.remove("Grass");
			bank2.add("Grass");
			System.out.println("Grass is transfered to Bank 2");
			}else{
				status = BoatProblem.checkStatus(bank1, bank2);
				bank2.remove("Grass");
				bank1.add("Grass");
				System.out.println("Grass is transfered to Bank 1");
			}
			break;
		case 4:
			System.out.println("bank 1 :" +bank1);
			System.out.println("bank 2 :" +bank2);
			break;
		default:
			System.out.println("Invalid choice");
			
		}
		if(bank2.size() == 3){
			System.out.println(bank2);
			success = true;
		}
		}while(!success);
		
	}
	public int displayMsg(){
		int choice;
		System.out.println("Welcome to the classic Boat game");
		System.out.println("choose which thing you want to transfer");
		System.out.println("1. Transfer Goat");
		System.out.println("2. Transfer Tiger");		
		System.out.println("3. Transfer Grass");
		System.out.println("4. Print animals on the banks");
		Scanner sc = new Scanner(System.in);
		choice = sc.nextInt();
		return choice;
	}
	
	public static String checkStatus(ArrayList bank1,ArrayList bank2){
		String status = "continue";
		if(bank1.contains("Goat") && bank1.contains("Grass") || bank1.contains("Goat") && bank1.contains("Tiger") || bank1.contains("Goat") && bank1.contains("Grass") || bank1.contains("Goat") && bank1.contains("Tiger")){
			status = "Game over";
		}
		return status;
	}
}
