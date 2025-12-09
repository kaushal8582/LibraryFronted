"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/lib/store";
import { Pencil, Upload } from "lucide-react";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { AccountInfo, getRazorpayInfo, updateAccount } from "@/lib/slices/settingsSlice";
import toast from "react-hot-toast";
import { Card } from "../ui/card";
import LibraryGallery from "../LibraryGalleryImg";
import HoursSettings from "../SetHours";
import MembershipPasses from "../MemberShipPasses";
import WhatYouOffer from "../WhatOffer";
import HeroImageUploader from "../HeroImageUploader";
import { uploadImageGlobal } from "@/lib/slices/studentsSlice";
import Loader from "../loaders/Loader";
import SkeletonLoader from "../loaders/SkeletonLoaders";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupInput } from "@/components/ui/input-group";

export function Settings() {
  const dispatch = useDispatch<AppDispatch>();
  const { razorpay,isLoading : razorpayLoading } = useSelector(
    (state: RootState) => state.settings
  );
  const { userFullData } = useSelector((state: RootState) => state.auth);
  const { isProfilePhotoUploaded } = useSelector(
    (state: RootState) => state.students
  );
  
  const stripAccPrefix = (v: string) => (v || "").replace(/^acc_/, "");
  const ensureAccPrefix = (v: string) => {
    const trimmed = (v || "").trim();
    return trimmed.startsWith("acc_") ? trimmed : `acc_${trimmed}`;
  };

  const [razorPayInfo,setRazorPayInfo] = useState({
    apiKey: razorpay?.razorPayKey || "",
    apiSecret: razorpay?.razorPaySecret || "",
    webhookSecret: razorpay?.razorPayWebhookSecret || "",
    // Store only the suffix in state; UI shows fixed acc_ prefix
    accountId: stripAccPrefix(razorpay?.razorPayAccountId || ""),
  });

 

  useEffect(() => {
    setRazorPayInfo({
      apiKey: razorpay?.razorPayKey || "",
      apiSecret: razorpay?.razorPaySecret || "",
      webhookSecret: razorpay?.razorPayWebhookSecret || "",
      // When loading from server, strip fixed acc_ prefix for editing
      accountId: stripAccPrefix(razorpay?.razorPayAccountId || ""),
    });
  }, [ razorpay]);



  const [accountInfo, setAccountInfo] = useState<AccountInfo>({
    name: userFullData?.libraryData?.name || "",
    contactEmail: userFullData?.libraryData?.contactEmail || "",
    address: userFullData?.libraryData?.address || "",
    contactPhone: userFullData?.libraryData?.contactPhone || "",
    userName: userFullData?.name || "",
    profileImg: userFullData?.avtar || "",
    aboutLibrary: userFullData?.libraryData?.aboutLibrary || "",
    bio : userFullData?.bio
  });

  useEffect(() => {
    setAccountInfo({
      name: userFullData?.libraryData?.name || "",
      contactEmail: userFullData?.libraryData?.contactEmail || "",
      address: userFullData?.libraryData?.address || "",
      contactPhone: userFullData?.libraryData?.contactPhone || "",
      userName: userFullData?.name || "",
      profileImg: userFullData?.avtar || "",
      aboutLibrary: userFullData?.libraryData?.aboutLibrary || "",
      bio : userFullData?.bio || "",
    });
  }, [userFullData]);

  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if(accountInfo?.address===""){
      toast.error("Please add your address");
      return;
    }
    try {
      setIsLoading(true);
      const response = await dispatch(
        updateAccount({
          libraryId: userFullData?.libraryId || "",
          data: accountInfo || null,
        })
      );
      if (response.meta.requestStatus === "fulfilled") {
        setIsLoading(false);
        toast.success("Account updated successfully");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to update account:", error);
    }
  };


  const saveRazorPayInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {

      const payload ={
        razorPayWebhookSecret : razorPayInfo.webhookSecret,
        razorPaySecret : razorPayInfo.apiSecret,
        razorPayKey : razorPayInfo.apiKey,
        // Always save with the required acc_ prefix
        razorPayAccountId : ensureAccPrefix(razorPayInfo.accountId),
      }

      setIsLoading(true);
      const response = await dispatch(
        updateAccount({
          libraryId: userFullData?.libraryId || "",
          data: payload || null,
        })
      );
      if (response.meta.requestStatus === "fulfilled") {
        setIsLoading(false);
        toast.success("Razorpay info updated successfully");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to update razorpay info:", error);
    }finally{
      setIsLoading(false);
    }

  };

  console.log("userfull data",userFullData)

  useEffect(() => {
      try {
        console.log("library id",userFullData?.libraryId)
        dispatch(getRazorpayInfo(userFullData?.libraryId || ""));
      } catch (error) {
        
      }
  }, [userFullData?.libraryId])




  const handelProfileImgUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("img", file);
    const res = await dispatch(uploadImageGlobal(formData));
    if (res.meta.requestStatus === "fulfilled") {
      console.log("url ", res.payload);
      setAccountInfo({
        ...accountInfo,
        profileImg: res.payload || "",
      });
    }
  };

  return (
    <div>
      <Header
        title="Settings"
        subtitle="Manage your library's integration, account, and subscription details."
      />

      <div className="p-8 space-y-8 max-w-4xl">
        {/* Razorpay Integration */}

        {
          !razorpayLoading ? <SkeletonLoader type="text"/> : (  <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Razorpay Integration
              </h3>
              <p className="text-sm text-muted-foreground">
                Connect your Razorpay account to accept payments.
              </p>
            </div>
            {/* <button
              // onClick={() => setIsRazorpayEnabled(!isRazorpayEnabled)}
              className={`w-12 h-6 rounded-full transition-colors ${
                1 ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  1 ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button> */}
            <Button isLoading={isLoading} onClick={saveRazorPayInfo} className="bg-blue-600 hover:bg-blue-700">
            Save Changes
          </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                API Key
              </label>
              <input
                type="text"
                value={razorPayInfo.apiKey}
                onChange={(e) => setRazorPayInfo({ ...razorPayInfo, apiKey: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                API Secret
              </label>
              <input
                type="text"
                value={razorPayInfo.apiSecret}
                onChange={(e) => setRazorPayInfo({ ...razorPayInfo, apiSecret: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                RazorPay webhook secret
              </label>
              <input
                type="text"
                value={razorPayInfo.webhookSecret}
                onChange={(e) => setRazorPayInfo({ ...razorPayInfo, webhookSecret: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                RazorPay Account Id
              </label>
              <InputGroup className="bg-secondary">
                <InputGroupAddon>
                  <InputGroupText>acc_</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  type="text"
                  value={razorPayInfo.accountId}
                  onChange={(e) =>
                    setRazorPayInfo({ ...razorPayInfo, accountId: e.target.value })
                  }
                  placeholder="Enter your Razorpay account ID"
                />
              </InputGroup>
            </div>
          </div>
        </div>)
        }
      
        {/* header img */}
        <HeroImageUploader
          value={userFullData}
          id={userFullData?.libraryId || ""}
        />
        <LibraryGallery
          value={userFullData}
          id={userFullData?.libraryId || ""}
        />
        <HoursSettings
          value={userFullData}
          id={userFullData?.libraryId || ""}
        />
        <MembershipPasses value={userFullData} />

        {/* Account Information */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Account Information
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Update your library's details.
              </p>
            </div>
            <Button
              isLoading={isLoading}
              onClick={(e) => {
                handleUpdateAccount(e);
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Update Information
            </Button>
          </div>

          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24">
              {isProfilePhotoUploaded ? (
                <div className="w-24 h-24 rounded-full border border-gray-300 flex items-center justify-center bg-gray-100">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
              ) : (
                <img
                  src={
                    accountInfo?.profileImg ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  className="w-24 h-24 rounded-full object-cover border border-gray-300"
                  alt="avatar"
                />
              )}

              {/* Pencil Icon Overlay */}
              <label className="absolute bottom-1 right-1 w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90">
                <Pencil size={14} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handelProfileImgUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Library Name
                </label>
                <input
                  type="text"
                  value={accountInfo?.name}
                  onChange={(e) =>
                    setAccountInfo({ ...accountInfo, name: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={accountInfo?.contactEmail}
                  onChange={(e) =>
                    setAccountInfo({
                      ...accountInfo,
                      contactEmail: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Contact Phone
                </label>
                <input
                  placeholder="Enter your phone number"
                  type="tel"
                  value={accountInfo?.contactPhone}
                  onChange={(e) =>
                    setAccountInfo({
                      ...accountInfo,
                      contactPhone: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={accountInfo?.userName}
                  onChange={(e) =>
                    setAccountInfo({
                      ...accountInfo,
                      userName: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Bio
              </label>
              <input
                type="text"
                placeholder="Write a short bio about yourself"
                value={accountInfo?.bio}
                onChange={(e) =>
                  setAccountInfo({
                    ...accountInfo,
                    bio: e.target.value,
                  })
                }
                className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Address
              </label>
              <textarea
                placeholder="Enter your address"
                value={accountInfo.address}
                onChange={(e) =>
                  setAccountInfo({ ...accountInfo, address: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                About Your Library
              </label>
              <textarea
                placeholder="Write a short description about your library"
                value={accountInfo.aboutLibrary}
                onChange={(e) =>
                  setAccountInfo({
                    ...accountInfo,
                    aboutLibrary: e.target.value,
                  })
                }
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
        <WhatYouOffer value={userFullData} />

        {/* Pro Plan */}
        {/* <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-lg">👑</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {"d"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Billed Monthly. Next payment on 12/08/2024.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">Cancel Plan</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Manage Subscription
              </Button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
