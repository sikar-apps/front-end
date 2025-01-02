"use client";
import React from 'react';
import { useState, useEffect } from 'react';

// import {AlertCircle, Loader2} from 'lucide-react';
// import { Alert, AlertDescription } from '@/components/ui/alert';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/Card";
import {Loader2} from "lucide-react";

interface Account {
    id: string;
    accountNumber: string;
    balance: number;
    accountHolder: string;
    createdAt: string;
}

const AccountsDashboard = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                //https://zbxbyi3ztb.execute-api.us-east-1.amazonaws.com/prod/api/accounts
                const response = await fetch('https://4mmfqdd24b.execute-api.us-east-1.amazonaws.com/prod/api/accounts', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch accounts');
                }
                const data = await response.json();
                setAccounts(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAccounts().then(data => console.log(data));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
        );
    }

    // if (error) {
    //     return (
    //         <Alert variant="destructive">
    //             <AlertCircle className="h-4 w-4" />
    //             <AlertDescription>{error}</AlertDescription>
    //         </Alert>
    //     );
    // }

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-2xl font-bold mb-6">Account Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {accounts.map((account) => (
                    <Card key={account.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="text-lg">{account.accountHolder}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Balance</span>
                                    <span className="font-medium">
                    ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Account Number</span>
                                    <span className="capitalize">{account.accountNumber}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Created At</span>
                                    <span className="text-sm">
                    {new Date(account.createdAt).toLocaleDateString()}
                  </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {accounts.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No accounts found. Please add an account to get started.
                </div>
            )}
        </div>
    );
};

export default AccountsDashboard;