import { clerkClient } from "@clerk/clerk-sdk-node";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data: users } = await clerkClient.users.getUserList({ limit: 200 });

    const agents = users.filter(
      (user) => user.publicMetadata?.role === "seller"
    );

    const agentData = agents.map((agent) => ({
      id: agent.id,
      name:
        `${agent.firstName || ""} ${agent.lastName || ""}`.trim() ||
        "Agent Name",
      email: agent.emailAddresses.find(
        (email) => email.id === agent.primaryEmailAddressId
      )?.emailAddress,
      imageUrl: agent.imageUrl,
    }));

    return NextResponse.json({ success: true, agents: agentData }, { status: 200 });
  } catch (error) {
    console.error("Error fetching agents from Clerk:", error);
    return NextResponse.json(
      { success: false, message: "Server Error: Failed to fetch agents" },
      { status: 500 }
    );
  }
}
