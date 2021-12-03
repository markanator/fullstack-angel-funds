-- CreateIndex
CREATE INDEX "Donation_id_donorId_projectId_idx" ON "Donation"("id", "donorId", "projectId");

-- CreateIndex
CREATE INDEX "Project_id_slug_authorId_idx" ON "Project"("id", "slug", "authorId");

-- CreateIndex
CREATE INDEX "Upvote_id_userId_projectId_idx" ON "Upvote"("id", "userId", "projectId");

-- CreateIndex
CREATE INDEX "User_id_email_idx" ON "User"("id", "email");
